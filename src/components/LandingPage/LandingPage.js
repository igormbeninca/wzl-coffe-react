import React from "react";
import {
  EuiPage,
  EuiPageBody,
  EuiPageContent,
  EuiPageContentBody,
  EuiFlexGroup,
  EuiFlexItem,
  EuiIcon
} from "@elastic/eui";
import { Carousel, CarouselTitle } from "../../components";
import { useCarousel } from "../../hooks/useCarousel";
import coding from "../../assets/img/111-coding.svg";
import macbook from "../../assets/img/118-macbook.svg";
import meetings from "../../assets/img/105-freelancer.svg";
import ironman from "../../assets/img/117-ironman.svg";
import styled from "styled-components";

const StyledEuiPage = styled(EuiPage)`
  flex: 1;
  padding-bottom: 5rem !important;
`;
const LandingTitle = styled.h1`
  font-size: 3rem;
  margin: 2rem 0;
  color: white;
`;

const StyledEuiPageContent = styled(EuiPageContent)`
  border-radius: 50% !important;
`;
const StyledEuiPageContentBody = styled(EuiPageContentBody)`
  max-width: 375px;
  max-height: 400px;

  & > img {
    max-width: 100%;
    border-radius: 50%;
    object-fit: cover;
  }
`;

const carouselItems = [
  { label: "Code", content: <img src={coding} alt="coding" /> },
  { label: "Work", content: <img src={macbook} alt="work" /> },
  { label: "Meetings", content: <img src={meetings} alt="meetings" /> },
  { label: "Projects", content: <img src={ironman} alt="ironman" /> }
];

export default function LandingPage() {
  const { current } = useCarousel(carouselItems, 3000);

  return (
    <StyledEuiPage>
      <EuiPageBody component="section">
        <EuiFlexGroup direction="column" alignItems="center">
          <EuiFlexItem>
            <EuiFlexGroup wrap>
            <EuiFlexItem>
                <LandingTitle>Kiosk Analytics</LandingTitle>
              </EuiFlexItem>
              <EuiFlexItem style={{ maxWidth: 440 }}>
                <EuiIcon
                  type="https://www.wzl.rwth-aachen.de/global/show_picture.asp?id=aaaaaaaaabdlfcs"
                  color="primary"
                  size="original"
                />
              </EuiFlexItem>
            </EuiFlexGroup>
          </EuiFlexItem>
          <EuiFlexItem>
            <CarouselTitle items={carouselItems} current={current} />
          </EuiFlexItem>
        </EuiFlexGroup>
        <EuiFlexGroup direction="rowReverse">
          <EuiFlexItem>
            <Carousel items={carouselItems} current={current} />
          </EuiFlexItem>
        </EuiFlexGroup>
      </EuiPageBody>
    </StyledEuiPage>
  );
}
