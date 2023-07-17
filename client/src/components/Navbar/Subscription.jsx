import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { paleYellow, darkPurple, orange } from "../../constant/actionTypes";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import * as api from "../../api";

/* import PaypalPayment from "../PaypalPayment/PaypalPayment"; */
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { constant } from "lodash";

export default function Subscription() {
  const [open, setOpen] = React.useState(false);
  const [showPayPalButton, setShowPayPalButton] = React.useState(false);
  const [description, setDescription] = React.useState("");
  const [cost, setCost] = React.useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("profile"));
  console.log("id", user.result._id);

  React.useEffect(() => {
    if (location.pathname === "/subscription") {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [location]);

  const handleClickOpen = () => {
    setOpen(true);
    setShowPayPalButton(false);
  };

  const directToMonthPayment = () => {
    setDescription("month");
    setCost("9.00");
    setShowPayPalButton(true);
    /* setOpen(false); */
  };
  const directToYearPayment = () => {
    setShowPayPalButton(true);
    setDescription("year");
    setCost("90.00");
    /* setOpen(false); */
  };

  const handleClose = () => {
    navigate("/explore");
    setOpen(false);
    setShowPayPalButton(false);
  };

  return (
    <div style={{ marginRight: "10px" }}>
      <Button
        onClick={handleClickOpen}
        sx={{
          fontFamily: "Comic Sans MS",
          color: darkPurple,
          fontWeight: "bold",
          textTransform: "none",
          fontSize: "20px",
        }}
      >
        Join us!
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{
          backgroundColor: paleYellow,
        }}
      >
        <DialogTitle
          id="alert-dialog-title"
          sx={{
            fontFamily: "Comic Sans MS",
            color: darkPurple,
            fontWeight: "bold",
            textTransform: "none",
            fontSize: "25px",
            justifyContent: "center",
            display: "flex",
            borderBottom: "1px solid",
          }}
        >
          Be our membership now!
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            sx={{
              fontFamily: "Comic Sans MS",
              textTransform: "none",
              fontSize: "17px",
              whiteSpace: "pre-line",
            }}
          >
            Sharing Posts and Building Groups! Creating Events and Sharing
            Services! Higher Exposure in Explore! Pure Mode! No Ads! ... More
            benefits of membership are waiting for you!
          </DialogContentText>
        </DialogContent>
        <DialogActions
          sx={{
            justifyContent: "center",
          }}
        >
          <Button
            onClick={directToMonthPayment}
            sx={{
              fontFamily: "Comic Sans MS",
              color: "white",
              fontWeight: "bold",
              textTransform: "none",
              fontSize: "20px",
              backgroundColor: orange,
              borderRadius: "10px",
              marginRight: "20px",
            }}
          >
            9$ per month
          </Button>
          <Button
            onClick={directToYearPayment}
            autoFocus
            sx={{
              fontFamily: "Comic Sans MS",
              color: "white",
              fontWeight: "bold",
              textTransform: "none",
              fontSize: "20px",
              backgroundColor: darkPurple,
              borderRadius: "10px",
              marginLeft: "20px",
            }}
          >
            90$ per year
          </Button>
        </DialogActions>
        {showPayPalButton && (
          <PayPalScriptProvider
            options={{
              clientId:
                "Ad8WcNeM12p5gnrqaZUIKL-5x9mP9JpRaNSulzlMFkcDcPI3xSwU013KEXgvPwyiDUslvp2rWIttfjOa",
            }}
          >
            <PayPalButtons
              style={{
                layout: "horizontal",
              }}
              createOrder={(data, actions) => {
                return actions.order
                  .create({
                    purchase_units: [
                      {
                        amount: {
                          value: cost,
                        },
                      },
                    ],
                  })
                  .then((orderId) => {
                    // Your code here after create the order
                    return orderId;
                  });
              }}
              onApprove={(data, actions) => {
                return actions.order.capture().then(function (details) {
                  // Your code here after capture the order
                  alert(
                    "transaction completed by" + details.payer.name.given_name
                  );
                  // 调用API更新用户数据
                  api
                    .updateMembership(user.result._id, { data: description })
                    .then((response) => {
                      if (response.status === 200) {
                        const updatedUser = response.data.user;

                        // 更新本地存储的用户信息
                        let user = JSON.parse(localStorage.getItem("profile"));
                        user.result.isPrime = updatedUser.isPrime;
                        user.result.startTime = updatedUser.startTime;
                        user.result.dueTime = updatedUser.dueTime;
                        localStorage.setItem("profile", JSON.stringify(user));
                        navigate("/explore");
                      } else if (response.status === 500) {
                        console.log("fail to update");
                      }
                    })
                    .catch((error) => {
                      console.error("更新用户数据时出错:", error);
                      // 处理错误...
                    });
                });
              }}
            />
          </PayPalScriptProvider>
        )}
      </Dialog>
    </div>
  );
}
