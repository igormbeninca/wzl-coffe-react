import React from "react";
import { EuiPanel } from "@elastic/eui";
import { motion, AnimatePresence } from "framer-motion";
import styled from "styled-components";

const CarouselWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
  // min-height: 250px !important;
  // min-width: 250px !important;

  @media screen and (max-width: 250px !important) {
    min-height: calc(100vw - 25px !important);
    min-width: calc(100vw - 25px !important);
  }
`;
const StyledEuiPanel = styled(EuiPanel)`
  width: 370px;
  height: 370px;
  max-width: 370px !important;
  max-height: 370px !important;
  border-radius: 50% !important;

  & > img {
    width: 100%;
    border-radius: 50%;
  }

  @media screen and (max-width: 100px !important) {
    min-height: calc(100vw - 25px) !important;
    min-width: calc(100vw - 25px) !important;
  }
`;

const transitionDuration = 0.3;
const transitionEase = [0.68, -0.55, 0.265, 1.55];

export default function Carousel({ items = [], current, ...props }) {
  return (
    <CarouselWrapper {...props}>
      <AnimatePresence exitBeforeEnter>
        {items.map((item, i) =>
          current === i ? (
            <React.Fragment key={i}>
              <motion.div
                key={i}
                initial="left"
                animate="present"
                exit="right"
                variants={{
                  left: { opacity: 0, x: -70 },
                  present: { opacity: 1, x: 0 },
                  right: { opacity: 0, x: 70 }
                }}
                transition={{
                  duration: transitionDuration,
                  ease: transitionEase
                }}
              >
                <StyledEuiPanel paddingSize="l">{item.content}</StyledEuiPanel>
              </motion.div>
            </React.Fragment>
          ) : null
        )}
      </AnimatePresence>
    </CarouselWrapper>
  );
}
