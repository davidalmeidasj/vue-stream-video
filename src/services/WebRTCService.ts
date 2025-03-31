export class WebRTCService {
  private localStream: MediaStream | null = null;

  async startCamera(): Promise<MediaStream> {
    this.localStream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: false,
    });
    return this.localStream;
  }

  stopCamera(): void {
    this.localStream?.getTracks().forEach((track) => track.stop());
  }

  getStream(): MediaStream | null {
    return this.localStream;
  }
}
