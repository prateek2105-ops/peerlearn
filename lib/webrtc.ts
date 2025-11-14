// WebRTC utilities for video calling
import SimplePeer from 'simple-peer';

export class VideoCallManager {
  private peer: SimplePeer.Instance | null = null;
  private localStream: MediaStream | null = null;
  private remoteStream: MediaStream | null = null;

  async initializeLocalStream(): Promise<MediaStream> {
    try {
      this.localStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      return this.localStream;
    } catch (error) {
      console.error('Error accessing media devices:', error);
      throw error;
    }
  }

  createPeer(initiator: boolean, stream: MediaStream): SimplePeer.Instance {
    this.peer = new SimplePeer({
      initiator,
      trickle: false,
      stream,
    });

    return this.peer;
  }

  signal(signalData: SimplePeer.SignalData) {
    if (this.peer) {
      this.peer.signal(signalData);
    }
  }

  onStream(callback: (stream: MediaStream) => void) {
    if (this.peer) {
      this.peer.on('stream', (stream) => {
        this.remoteStream = stream;
        callback(stream);
      });
    }
  }

  onSignal(callback: (data: SimplePeer.SignalData) => void) {
    if (this.peer) {
      this.peer.on('signal', callback);
    }
  }

  toggleAudio(enabled: boolean) {
    if (this.localStream) {
      this.localStream.getAudioTracks().forEach((track) => {
        track.enabled = enabled;
      });
    }
  }

  toggleVideo(enabled: boolean) {
    if (this.localStream) {
      this.localStream.getVideoTracks().forEach((track) => {
        track.enabled = enabled;
      });
    }
  }

  endCall() {
    if (this.peer) {
      this.peer.destroy();
      this.peer = null;
    }
    if (this.localStream) {
      this.localStream.getTracks().forEach((track) => track.stop());
      this.localStream = null;
    }
    if (this.remoteStream) {
      this.remoteStream.getTracks().forEach((track) => track.stop());
      this.remoteStream = null;
    }
  }
}

export const videoCallManager = new VideoCallManager();