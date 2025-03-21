export type ProgressListener = (p: number) => void;
export type MessageListener = (m: string) => void;

let listeners: ProgressListener[] = [];
let messageListeners: MessageListener[] = [];

let internalProgress = 0;
let targetProgress = 0;
let animationFrame: number;

function startProgressAnimation() {
  cancelAnimationFrame(animationFrame);
  const animate = () => {
    if (internalProgress < targetProgress) {
      internalProgress += (targetProgress - internalProgress) * 0.1;
      listeners.forEach((cb) => cb(Math.floor(internalProgress)));
      animationFrame = requestAnimationFrame(animate);
    } else {
      internalProgress = targetProgress;
      listeners.forEach((cb) => cb(Math.floor(internalProgress)));
    }
  };
  animate();
}

export function setProgress(p: number) {
  targetProgress = Math.min(p, 100);
  startProgressAnimation();
}

export let first = false;
export function enableFirst() {
  first = true;
  return first;
}
export function disableFirst() {
  first = false;
  return first;
}

export function setMessage(msg: string) {
  messageListeners.forEach((cb) => cb(msg));
}

export function subscribeToProgress(cb: ProgressListener) {
  listeners.push(cb);
  cb(internalProgress);
  return () => {
    listeners = listeners.filter((l) => l !== cb);
  };
}

export function subscribeToMessage(cb: MessageListener) {
  messageListeners.push(cb);
  return () => {
    messageListeners = messageListeners.filter((l) => l !== cb);
  };
}
