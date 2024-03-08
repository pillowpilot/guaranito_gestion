import React from "react";
import { Container, Skeleton } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";

const Loading = () => {
  const {
    innerHeight: windowHeight, // in px
  } = window;

  const skeletonHeight = 150; // px

  return (
    <Container>
      <Grid
        container
        rowSpacing={3}
        columnSpacing={3}
        columns={{ xs: 1, md: 12 }}
        disableEqualOverflow
      >
        {(() => {
          const rowNodes = [];
          const nRows = Math.floor(windowHeight / skeletonHeight) - 1;
          let key = 1;
          for (let i = 0; i < nRows; i++) {
            rowNodes.push(
              <Grid xs={1} md={4} key={key}>
                <Skeleton variant="rounded" height={skeletonHeight} />
              </Grid>
            );
            rowNodes.push(
              <Grid xs={1} md={4} key={key+1}>
                <Skeleton variant="rounded" height={skeletonHeight} />
              </Grid>
            );
            rowNodes.push(
              <Grid xs={1} md={4} key={key+2}>
                <Skeleton variant="rounded" height={skeletonHeight} />
              </Grid>
            );
            key += 3;
          }
          return rowNodes;
        })()}
      </Grid>
    </Container>
  );
};

export { Loading };
