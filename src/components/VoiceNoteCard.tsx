import { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowUp, ArrowDown, Play, Pause, Trash2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface VoiceNoteCardProps {
  note: {
    id: string;
    audio_url: string;
    votes_count: number;
    created_at: string;
    user_id: string;
    duration_seconds?: number;
  };
  userVote?: { vote_type: number } | null;
  onVoteChange: () => void;
  onDelete: () => void;
  isPlaying: boolean;
  onPlayToggle: () => void;
}

export const VoiceNoteCard = ({
  note,
  userVote,
  onVoteChange,
  onDelete,
  isPlaying,
  onPlayToggle
}: VoiceNoteCardProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isVoting, setIsVoting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Local state for optimistic updates
  const [localVotesCount, setLocalVotesCount] = useState(note.votes_count);
  const [localUserVote, setLocalUserVote] = useState(userVote?.vote_type);

  // Ref to know when optimistic update is active
  const isOptimisticUpdateRef = useRef(false);

  // Sync local state from props only if not in optimistic update
  useEffect(() => {
    if (!isOptimisticUpdateRef.current && note.votes_count !== localVotesCount) {
      setLocalVotesCount(note.votes_count);
    }
  }, [note.votes_count]);

  useEffect(() => {
    if (!isOptimisticUpdateRef.current) {
      setLocalUserVote(userVote?.vote_type);
    }
  }, [userVote?.vote_type]);

  const handleVote = async (voteType: number) => {
    if (!user || isVoting) return;

    if (note.user_id === user.id) {
      toast({ title: "Cannot vote", description: "You cannot vote on your own voice note" });
      return;
    }

    setIsVoting(true);
    isOptimisticUpdateRef.current = true;

    const previousCount = localVotesCount;
    const previousUserVote = localUserVote;

    try {
      // Optimistic update - show final result immediately
      if (localUserVote === voteType) {
        // Remove vote
        setLocalVotesCount(prev => prev - voteType);
        setLocalUserVote(undefined);
      } else if (localUserVote !== undefined) {
        // Change vote: undo old, apply new
        const delta = voteType - localUserVote;
        setLocalVotesCount(prev => prev + delta);
        setLocalUserVote(voteType);
      } else {
        // New vote
        setLocalVotesCount(prev => prev + voteType);
        setLocalUserVote(voteType);
      }

      // Database operation
      if (userVote && userVote.vote_type === voteType) {
        const { error } = await supabase
          .from('votes')
          .delete()
          .eq('note_id', note.id)
          .eq('user_id', user.id);
        if (error) throw error;
      } else if (userVote) {
        const { error } = await supabase
          .from('votes')
          .update({ vote_type: voteType })
          .eq('note_id', note.id)
          .eq('user_id', user.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('votes')
          .insert({ note_id: note.id, user_id: user.id, vote_type: voteType });
        if (error) throw error;
      }

      // Allow prop updates after slight delay
      setTimeout(() => {
        isOptimisticUpdateRef.current = false;
        onVoteChange();
      }, 500);
    } catch (error: any) {
      // Rollback
      setLocalVotesCount(previousCount);
      setLocalUserVote(previousUserVote);
      isOptimisticUpdateRef.current = false;

      toast({ variant: "destructive", title: "Error", description: error.message });
    } finally {
      setIsVoting(false);
    }
  };

  const handleDelete = async () => {
    if (!user || isDeleting || note.user_id !== user.id) return;
    setIsDeleting(true);

    try {
      const { error } = await supabase
        .from('voice_notes')
        .delete()
        .eq('id', note.id);

      if (error) throw error;

      toast({ title: "Deleted", description: "Voice note deleted successfully" });
      onDelete();
    } catch (error: any) {
      toast({ variant: "destructive", title: "Error", description: error.message });
    } finally {
      setIsDeleting(false);
    }
  };

  const formatDuration = (seconds?: number) => {
    if (!seconds) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <Card className="shadow-card border-border/50 hover:shadow-glow transition-smooth">
      <CardContent className="p-4">
        <div className="flex items-center gap-4">
          <div className="flex flex-col items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleVote(1)}
              disabled={isVoting || (user && note.user_id === user.id)}
              className={localUserVote === 1 ? 'text-primary' : ''}
            >
              <ArrowUp className="w-5 h-5" />
            </Button>
            <span className="text-sm font-bold min-w-[2ch] text-center">
              {localVotesCount}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleVote(-1)}
              disabled={isVoting || (user && note.user_id === user.id)}
              className={localUserVote === -1 ? 'text-destructive' : ''}
            >
              <ArrowDown className="w-5 h-5" />
            </Button>
          </div>

          <div className="flex-1 flex items-center gap-3">
            <Button
              variant="outline"
              size="icon"
              onClick={onPlayToggle}
              className="shrink-0 gradient-primary shadow-glow"
            >
              {isPlaying ? (
                <Pause className="w-4 h-4 text-primary-foreground" />
              ) : (
                <Play className="w-4 h-4 text-primary-foreground" />
              )}
            </Button>

            <div className="flex-1">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">Anonymous</span>
                <span>•</span>
                <span>{formatDate(note.created_at)}</span>
                <span>•</span>
                <span>{formatDuration(note.duration_seconds)}</span>
              </div>
              <div className="h-8 flex items-center gap-1 mt-1">
                {[...Array(40)].map((_, i) => (
                  <div
                    key={i}
                    className="w-1 bg-primary/30 rounded-full"
                    style={{ height: `${Math.random() * 100}%` }}
                  />
                ))}
              </div>
            </div>

            {user && note.user_id === user.id && (
              <Button
                variant="ghost"
                size="icon"
                onClick={handleDelete}
                disabled={isDeleting}
                className="text-destructive hover:text-destructive"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

