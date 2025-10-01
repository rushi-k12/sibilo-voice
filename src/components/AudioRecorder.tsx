import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Mic, Square, Upload } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface AudioRecorderProps {
  channelId: string;
  onUploadComplete: () => void;
}

export const AudioRecorder = ({ channelId, onUploadComplete }: AudioRecorderProps) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const startTimeRef = useRef<number>(0);
  const { toast } = useToast();
  const { user } = useAuth();

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];
      startTimeRef.current = Date.now();

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
        setAudioBlob(blob);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);

      // Auto-stop after 30 seconds
      setTimeout(() => {
        if (mediaRecorderRef.current?.state === 'recording') {
          stopRecording();
          toast({
            title: "Recording stopped",
            description: "Maximum recording time of 30 seconds reached",
          });
        }
      }, 30000);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to access microphone: " + error.message,
      });
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current?.state === 'recording') {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const uploadAudio = async () => {
    if (!audioBlob || !user) return;
    setIsUploading(true);

    try {
      const duration = Math.floor((Date.now() - startTimeRef.current) / 1000);
      const fileName = `${user.id}/${Date.now()}.webm`;

      // Upload to storage
      const { error: uploadError } = await supabase.storage
        .from('voice-notes')
        .upload(fileName, audioBlob);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('voice-notes')
        .getPublicUrl(fileName);

      // Create voice note record
      const { error: insertError } = await supabase
        .from('voice_notes')
        .insert({
          channel_id: channelId,
          user_id: user.id,
          audio_url: publicUrl,
          duration_seconds: duration,
        });

      if (insertError) throw insertError;

      toast({
        title: "Success!",
        description: "Your voice note has been posted anonymously",
      });

      setAudioBlob(null);
      onUploadComplete();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Upload failed",
        description: error.message,
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Card className="shadow-card border-border/50">
      <CardContent className="p-6">
        <div className="flex flex-col items-center gap-4">
          {!audioBlob ? (
            <>
              {!isRecording ? (
                <Button
                  onClick={startRecording}
                  size="lg"
                  className="gradient-primary shadow-glow gap-2"
                >
                  <Mic className="w-5 h-5" />
                  Record Voice Note
                </Button>
              ) : (
                <div className="space-y-4 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-3 h-3 bg-destructive rounded-full animate-pulse" />
                    <span className="text-sm font-medium">Recording...</span>
                  </div>
                  <Button
                    onClick={stopRecording}
                    size="lg"
                    variant="outline"
                    className="gap-2"
                  >
                    <Square className="w-5 h-5" />
                    Stop Recording
                  </Button>
                  <p className="text-xs text-muted-foreground">
                    Max 30 seconds
                  </p>
                </div>
              )}
            </>
          ) : (
            <div className="space-y-4 w-full">
              <audio src={URL.createObjectURL(audioBlob)} controls className="w-full" />
              <div className="flex gap-2">
                <Button
                  onClick={uploadAudio}
                  disabled={isUploading}
                  className="flex-1 gradient-primary shadow-glow gap-2"
                >
                  <Upload className="w-4 h-4" />
                  {isUploading ? 'Uploading...' : 'Post Anonymously'}
                </Button>
                <Button
                  onClick={() => setAudioBlob(null)}
                  variant="outline"
                  disabled={isUploading}
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
