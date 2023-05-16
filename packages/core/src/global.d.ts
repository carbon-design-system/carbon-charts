interface Document {
  webkitFullscreenElement?: Element;
  mozFullScreenElement?: Element;
  msFullscreenElement?: Element;

  webkitExitFullscreen?: () => void;
  mozCancelFullScreen?: () => void;
  msExitFullscreen?: () => void;
}

interface HTMLElement {
  webkitRequestFullscreen?: () => void;
  mozRequestFullScreen?: () => void;
  msRequestFullscreen?: () => void;
}

