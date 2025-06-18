export default interface NavbarTypes{
    signInHandler: () => void;
    signedIn?: boolean;
    picture: string;
    hmbgrClickHandler: () => void;
    setShowLoginModal: (bool: boolean) => void
};



