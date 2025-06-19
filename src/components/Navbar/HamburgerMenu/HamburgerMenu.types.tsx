export interface HamburgerTypes {
    showHamburger: boolean;
    setShowHamburger: (bool: boolean) => void;
    signInHandler: () => void;
    signedIn: boolean;
    picture: string;
}