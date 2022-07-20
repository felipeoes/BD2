import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import { MdOutlineArrowDownward, MdOutlineArrowUpward } from "react-icons/md";
import { useTheme } from "styled-components";

const CARD_WIDTH = 300;
const CARD_HEIGHT = 200;

export default function MetricCard(props) {
  const percentage = props.percentage;
  const theme = useTheme();

  return (
    <Card
      sx={{
        height: "100%",
        width: CARD_WIDTH,
        // margin: 0.2,
        // height: CARD_HEIGHT,
        // maxHeight: CARD_HEIGHT,
        overflow: "auto",
        // display: "flex",
        // alignItems: "center",
        // justifyContent: "center",
      }}
      //   {...props}
    >
      <CardContent>
        <Grid container spacing={2} sx={{ justifyContent: "space-between" }}>
          <Grid item>
            <Typography
              color="textSecondary"
              gutterBottom
              variant="overline"
              sx={{
                fontSize: 12,
                fontFamily: "InterMedium",
              }}
            >
              {props.title}
            </Typography>

            <Typography color="textPrimary" variant="h5">
              {
                // checa se tem casa decimal, se tiver, usa somente duas casas. Se não, usa apenas a casa inteira
                props.value.toString().indexOf(".") > -1
                  ? `R$ ${props.value.toFixed(2)}`
                  : props.value
              }
              {/* {props.value.toFixed(2)} */}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar
              sx={{
                backgroundColor: props.iconBgColor,
                height: 32,
                width: 32,
              }}
            >
              {props.Icon}
            </Avatar>
          </Grid>
        </Grid>
        <Box
          sx={{
            pt: 2,
            display: "flex",
            alignItems: "center",
          }}
        >
          {percentage > 0 ? (
            <MdOutlineArrowUpward size={20} color={theme.colors.success} />
          ) : (
            <MdOutlineArrowDownward size={20} color={theme.colors.red} />
          )}
          <Typography
            color={percentage > 0 ? "success" : "error"}
            sx={{
              mr: 1,
              fontFamily: "InterRegular",
            }}
            variant="body2"
          >
            {
              // checa se tem casa decimal, se tiver, usa somente duas casas. Se não, usa apenas a casa inteira
              percentage.toFixed(percentage.toString().includes(".") ? 2 : 0)
            }
            %
          </Typography>
          <Typography
            color="textSecondary"
            variant="caption"
            sx={{
              mt: 0,
              fontFamily: "InterRegular",
            }}
          >
            Desde o último mês
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
