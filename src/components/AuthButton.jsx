import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";

import { LOGIN_ROUTE } from "../utils/consts";

const AuthButton = observer(() => {
  const { user, layers } = useContext(Context);
  const navigate = useNavigate();

  return (
    <div>
      {user.isAuth ? (
        <Button
          key={user.user.id}
          type="text"
          className="login-button"
          onClick={() => {
            user.setUser({});
            user.setIsAuth(false);
            user.setPolicies([]);
            layers.setLayers([]);
            localStorage.removeItem("token");
            localStorage.clear();
          }}
        >
          Вийти
        </Button>
      ) : (
        <Button
          type="text"
          className="login-button"
          onClick={() => navigate(LOGIN_ROUTE)}
        >
          Увійти
        </Button>
      )}
    </div>
  );
});

export default AuthButton;
