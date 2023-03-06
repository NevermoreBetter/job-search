import React from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { nanoid } from "nanoid";
const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
  const pageNumber = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumber.push(i);
  }
  return (
    <nav>
      <ButtonGroup
        variant="contained"
        aria-label="outlined primary button group"
      >
        {pageNumber.map((number) => (
          <Button onClick={() => paginate(number)} key={nanoid()}>
            {number}
          </Button>
        ))}
      </ButtonGroup>
    </nav>
  );
};

export default Pagination;
