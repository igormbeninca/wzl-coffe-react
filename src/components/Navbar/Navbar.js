import React, { useState } from "react";
import { connect } from "react-redux";
import { Actions as authActions } from "../../redux/auth";
import { useNavigate } from "react-router-dom";

/**
 * Docs note: Consuming apps should import the theme via the export json file
 * import theme from '@elastic/eui/dist/eui_theme_light.json';
 */

import {
  EuiHeader,
  EuiHeaderLogo,
  EuiHeaderLinks,
  EuiHeaderLink,
  EuiHeaderSectionItemButton,
  EuiAvatar,
  EuiFlexGroup,
  EuiFlexItem,
  EuiHeaderSectionItem,
  EuiLink,
  EuiPopover,
  EuiSpacer,
  EuiText,
  EuiHeaderSection
} from "@elastic/eui";
import { Link } from "react-router-dom";
import { htmlIdGenerator } from "@elastic/eui/lib/services";

function Navbar({ user, logUserOut, ...props }) {
  const navigate = useNavigate();
  const HeaderUserMenu = () => {
    const id = htmlIdGenerator()();
    const [isOpen, setIsOpen] = useState(false);

    const handleLogout = () => {
      closeMenu();
      logUserOut();
      navigate("/login");
    };
    const onMenuButtonClick = () => {
      setIsOpen(!isOpen);
    };

    const closeMenu = () => {
      setIsOpen(false);
    };

    const button = (
      <EuiHeaderSectionItemButton
        aria-controls={id}
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label="Account menu"
        onClick={onMenuButtonClick}
      >
        {/* <EuiAvatar name={user.full_name || "Anonymous"} size="s" color="#006bb4" /> */}
        <EuiAvatar  
          name={user.full_name || ""} 
          iconType={user.full_name != null? "" :"push"} 
          size="m" 
          color="#006bb4" />
      </EuiHeaderSectionItemButton>
    );

    return (
      <EuiPopover
        id={id}
        ownFocus
        button={button}
        isOpen={isOpen}
        anchorPosition="downRight"
        closePopover={closeMenu}
        panelPaddingSize="none"
      >
        <div style={{ width: 320 }}>
          <EuiFlexGroup
            gutterSize="m"
            className="euiHeaderProfile"
            responsive={false}
          >
            <EuiFlexItem grow={false}>
            <EuiAvatar  
              name={user.full_name || ""} 
              iconType={user.full_name != null? "user" :"visBarVerticalStacked"} 
              size="xl"
              color="#006bb4"  
              />
            </EuiFlexItem>

            <EuiFlexItem>
              <EuiText>
                <p>{user.full_name || "What you waiting for?"}</p>
              </EuiText>

              <EuiSpacer size="m" />

              <EuiFlexGroup>
                <EuiFlexItem>
                  <EuiFlexGroup justifyContent="spaceBetween">
                    <EuiFlexItem grow={false}>
                    <Link to={user.full_name != null? "/profile" :"/registration"}>
                      <EuiLink>{user.full_name != null? "Profile" :"Sign up"}</EuiLink>
                    </Link>
                  </EuiFlexItem>

                    <EuiFlexItem grow={true}>
                      <EuiLink onClick={() => handleLogout()}>{user.full_name != null? "Log out" :"Log in"}</EuiLink>
                    </EuiFlexItem>
                  </EuiFlexGroup>
                </EuiFlexItem>
              </EuiFlexGroup>
            </EuiFlexItem>
          </EuiFlexGroup>
        </div>
      </EuiPopover>
    );
  };

  return (
    <EuiHeader 
      sections={[
        {
          items: [
            <Link to="/">
              <EuiHeaderLogo  iconType="visBarVerticalStacked"></EuiHeaderLogo>
            </Link>,
            <EuiHeaderLinks>
              <Link to="/coffeanalytics">
                <EuiHeaderLink  iconType="visAreaStacked">
                  Analytics
                </EuiHeaderLink>
              </Link>
              <Link to="/newcoffe">
                <EuiHeaderLink iconType="cheer">Buy</EuiHeaderLink>
              </Link>
              <Link to="/adminPanel">
                {user.is_superuser === true ? <EuiHeaderLink iconType="reporter">Admin</EuiHeaderLink> : null}
              </Link>
            </EuiHeaderLinks>
          ],
          // borders: "right"
        },
        {
          items: [
            <EuiHeaderSection side="right">
              <EuiHeaderSectionItem>
                <HeaderUserMenu />
              </EuiHeaderSectionItem>
            </EuiHeaderSection>
          ],
          // borders: "right"
        }
      ]}
    />
  );
}
export default connect((state) => ({ user: state.auth.user }), {
  logUserOut: authActions.logUserOut
})(Navbar);
