import Modal from '@/containers/Modal/Modal'
import React from 'react'
import styled from 'styled-components';
import { NavLinks, SocialLinks } from '../Navbar.styles';
import { useRouter } from 'next/router';
import Image from 'next/image';

const Container = styled.nav`
    height: 100%;
    width: 80%;
    position: fixed;
    right: 0;
    top: 0;
    background-color: #ffff;
    color: black;
`;

const TopContainer = styled.div`
    height: 60px;
    border-bottom: 1px solid #75757549;
    display: flex;
    justify-content: space-between;
    padding: 0 16px;
    align-items: center;
    h2 {
        font-family: 'Dancing Script',cursive;
        font-size: 2rem;
    }
    div {
        font-family: "Segoe UI",Tahoma,Geneva,Verdana,sans-serif;
        font-size: 1.4rem;
    }
`;

const LinkContainer = styled.div`
    height: calc(100% - 60px);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 20px 16px;
`;

function HamburgerMenu({ showHamburger, setShowHamburger, signInHandler, signedIn }: { showHamburger: boolean, setShowHamburger: (bool: boolean) => void, signInHandler: () => void, signedIn: boolean }) {
    function containerClickHandler(e: React.MouseEvent<HTMLDivElement>) {
        e.stopPropagation()
    }
    const router = useRouter();
  return (
    <>
        {showHamburger &&
            <Modal hideModal={() => setShowHamburger(false)}>
                <Container onClick={containerClickHandler}>
                    <TopContainer>
                        <h2>Navigation</h2>
                        <div onClick={() => setShowHamburger(false)}>
                            &#9587;
                        </div>
                    </TopContainer>
                    <LinkContainer>
                        <NavLinks isHamburger={true}>
                            <li onClick={() => router.push("/")}>Home</li>
                            <li>Features</li>
                            <li>About Me</li>
                            <li onClick={signInHandler}>{signedIn ? "Sign Out" : "Sign In"}</li>
                        </NavLinks>
                        <SocialLinks isHamburger={true}>
                            <li><Image src="/facebook.png" alt={""} height="25" width="25" /></li>
                            <li><Image src="/instagram.png" alt={""} height="25" width="25" /></li>
                            <li><Image src="/linkedin.png" alt={""} height="25" width="25" /></li>
                        </SocialLinks>
                    </LinkContainer>
                </Container>
            </Modal>
        }
    </>
  )
}

export default HamburgerMenu