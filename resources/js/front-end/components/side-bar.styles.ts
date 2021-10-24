import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles({
  wrapper: {
    display: 'flex',
    height: '100vh'
  },
  root: {
    padding: "10px",
    width: "12%",
    background: "#03254C"
  },
  ul: {
    listStyleType: "none",
    padding: 0,
    '&>li': {
      '&>a': {
        color: '#FFF',
        textDecoration: "none",
        fontSize: '16pt'
      }
    }

  }
})