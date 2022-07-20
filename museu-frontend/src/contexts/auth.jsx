import React from "react";
import { createContext, useState, useReducer } from "react";
import axios from "axios";

import api, {
  API_AUTH_TOKEN_NAME,
  FRONT_BASEURL,
  API_BASE_URL,
} from "../services/useAxios";

const AuthContext = createContext({});

const user = JSON.parse(localStorage.getItem(API_AUTH_TOKEN_NAME) || "{}");

const initialState = {
  isLoggedIn: Boolean(localStorage.getItem(API_AUTH_TOKEN_NAME) !== null),
  user: refactorUser(user),
};

function refactorUser(user) {
  if (user["name"]) {
    const names = user["name"].split(" ");
    user["first_name"] = names[0];
    user["last_name"] = names[1];
  }

  if (!user["profile_image"]) {
    user["profile_image"] = user["avatar_url"];
  } else if (!user["profile_image"].includes("http")) {
    user["profile_image"] =
      API_BASE_URL.replace("api/", "") + user["profile_image"];
  }

  return user;
}

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN": {
      var tokens = action.payload.tokens;

      if (tokens) {
        localStorage.setItem(API_AUTH_TOKEN_NAME, JSON.stringify(tokens));
      }

      let user = action.payload.user;
      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
      }

      return {
        ...state,
        isLoggedIn: action.payload.isLoggedIn,
        user: user,
      };
    }
    case "LOGOUT": {
      localStorage.clear();
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    }
    case "UPDATE_USER": {
      let user = action.payload.user;

      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
      }

      return {
        ...state,
        user: action.payload.user,
      };
    }

    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() =>
    localStorage.getItem(API_AUTH_TOKEN_NAME)
  );

  const [state, dispatch] = useReducer(reducer, initialState);

  const useAxios = () => {
    const axiosInstance = axios.create({
      baseURL: API_BASE_URL,
    });

    return axiosInstance;
  };

  async function GetModels() {
    try {
      const response = await api.get("/modelos/");

      if (response.status === 200) {
        return response.data.results;
      }
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async function GetPrediction(data) {
    try {
      const response = await api.post("/predict/", data);

      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async function GetModelsTypes() {
    try {
      const response = await api.get("/tipos-modelos/");

      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async function CreateOrUpdateModel(model_id, data) {
    try {
      if (model_id) {
        const response = await api.put(`/modelos/${model_id}/`, data);

        if (response.status === 200) {
          return response.data;
        }
      } else {
        const response = await api.post("/modelos/", data);
        if (response.status === 201) {
          return response.data;
        }
      }
    } catch (error) {
      console.log(error);
      return error.response;
    }
  }
  function DeleteModel(model_id) {
    return api.delete(`/modelos/${model_id}/`);
  }

  async function GetModelsLogs() {
    try {
      const response = await api.get("/logs-modelos/");

      if (response.status === 200) {
        return response.data.results;
      }
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async function GetModelsPredictionByTime() {
    try {
      const response = await api.get("/monitoramento-modelo/predicao/");

      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async function GetUsers() {
    try {
      const response = await api.get("/users/");

      if (response.status === 200) {
        return response.data.results;
      }
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async function GetModel(endpoint) {
    try {
      const response = await api.get(endpoint);

      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async function GetTotalCostByMonth() {
    try {
      const response = await api.get("/objetos-custo-total-mes/");

      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async function GetTotalCostByYearByCollection() {
    try {
      const response = await api.get("/objetos-custo-total-ano-colecao/");

      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async function GetTotalCostByYear() {
    try {
      const response = await api.get("/objetos-custo-total-ano/");

      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async function GetGroupedData() {
    try {
      const response = await api.get("/agrupamentos/");

      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async function GetTotalAmountByMonth() {
    try {
      const response = await api.get("objetos-quantidade-total-mes/");

      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async function GetTotalAmountByYear() {
    try {
      const response = await api.get("objetos-quantidade-total-ano/");

      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  const contextData = {
    state,
    signed: Boolean(localStorage.getItem(API_AUTH_TOKEN_NAME) !== null),
    dispatch,
    user,
    setUser,
    GetModels,
    GetPrediction,
    CreateOrUpdateModel,
    DeleteModel,
    GetModelsTypes,
    GetModelsLogs,
    GetModelsPredictionByTime,
    GetUsers,
    GetModel,
    GetTotalCostByMonth,
    GetTotalCostByYear,
    GetTotalCostByYearByCollection,
    GetTotalAmountByMonth,
    GetTotalAmountByYear,
    GetGroupedData,
    
  };

  return (
    <AuthContext.Provider
      value={{
        ...contextData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
