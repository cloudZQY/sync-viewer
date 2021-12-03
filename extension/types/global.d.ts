declare const player: {
    getCurrentTime: () => number;
    seek: (currentTime: number) => void;
    play: () => void;
    pause: () => void;
    addEventListener: (event: string, callback: () => void) =>  void;
}

declare const Toastify: any;