'use client';

import { useEffect, useRef, useState } from 'react';
import { videoCallManager } from '@/lib/webrtc';
import { Mic, MicOff, Video, VideoOff, PhoneOff } from 'lucide-react';

interface VideoCallProps {
  roomId: string;
  userId: string;
  onEndCall: () => void;
}

export default function VideoCall({ roomId, userId, onEndCall }: VideoCallProps) {
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [callStarted, setCallStarted] = useState(false);

  useEffect(() => {
    initializeCall();
    return () => {
      videoCallManager.endCall();
    };
  }, []);

  const initializeCall = async () => {
    try {
      const stream = await videoCallManager.initializeLocalStream();
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }

      const peer = videoCallManager.createPeer(true, stream);

      videoCallManager.onStream((remoteStream) => {
        if (remoteVideoRef.current) {
          remoteVideoRef.current.srcObject = remoteStream;
        }
      });

      setCallStarted(true);
    } catch (error) {
      console.error('Failed to initialize call:', error);
      alert('Failed to access camera/microphone. Please check permissions.');
    }
  };

  const toggleAudio = () => {
    const newState = !audioEnabled;
    videoCallManager.toggleAudio(newState);
    setAudioEnabled(newState);
  };

  const toggleVideo = () => {
    const newState = !videoEnabled;
    videoCallManager.toggleVideo(newState);
    setVideoEnabled(newState);
  };

  const handleEndCall = () => {
    videoCallManager.endCall();
    onEndCall();
  };

  return (
    <div className="fixed inset-0 bg-gray-900 z-50">
      <div className="h-full flex flex-col">
        {/* Remote Video (Main) */}
        <div className="flex-1 relative bg-black">
          <video
            ref={remoteVideoRef}
            autoPlay
            playsInline
            className="w-full h-full object-cover"
          />
          {!callStarted && (
            <div className="absolute inset-0 flex items-center justify-center text-white">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
                <p>Connecting...</p>
              </div>
            </div>
          )}
        </div>

        {/* Local Video (Picture-in-Picture) */}
        <div className="absolute top-4 right-4 w-48 h-36 bg-gray-800 rounded-lg overflow-hidden shadow-lg">
          <video
            ref={localVideoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover"
          />
        </div>

        {/* Controls */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center space-x-4">
          <button
            onClick={toggleAudio}
            className={`p-4 rounded-full ${
              audioEnabled ? 'bg-gray-700 hover:bg-gray-600' : 'bg-red-600 hover:bg-red-700'
            } text-white transition-colors`}
          >
            {audioEnabled ? <Mic className="h-6 w-6" /> : <MicOff className="h-6 w-6" />}
          </button>

          <button
            onClick={toggleVideo}
            className={`p-4 rounded-full ${
              videoEnabled ? 'bg-gray-700 hover:bg-gray-600' : 'bg-red-600 hover:bg-red-700'
            } text-white transition-colors`}
          >
            {videoEnabled ? <Video className="h-6 w-6" /> : <VideoOff className="h-6 w-6" />}
          </button>

          <button
            onClick={handleEndCall}
            className="p-4 rounded-full bg-red-600 hover:bg-red-700 text-white transition-colors"
          >
            <PhoneOff className="h-6 w-6" />
          </button>
        </div>
      </div>
    </div>
  );
}