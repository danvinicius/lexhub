type Method = "head" | "options" | "put" | "post" | "patch" | "delete" | "get";

interface RequestFormat {
  url: string;
  options: {
    method: Method,
    headers: any,
  }
}

export const CREATE_USER = (): RequestFormat => {
  return {
    url: `/user/register`,
    options: {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
    },
  };
};

export const AUTH_USER = (): RequestFormat => {
  return {
    url: `/user/auth`,
    options: {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
    },
  };
};

export const GET_ME = (token: string): RequestFormat => {
  return {
    url: `/user/me`,
    options: {
      method: "get",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    },
  };
};

export const GET_PROJECTS = (token: string): RequestFormat => {
  return {
    url: `/project`,
    options: {
      method: "get",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    },
  };
};

export const GET_PROJECT = (id: number, token: string): RequestFormat => {
  return {
    url: `/project/${id}`,
    options: {
      method: "get",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    },
  };
};

export const CREATE_PROJECT = (token: string): RequestFormat => {  
  return {
    url: `/project`,
    options: {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
    },
  };
};

export const CREATE_SYMBOL = (projectId: number, token: string): RequestFormat => {  
  return {
    url: `/project/${projectId}/symbol`,
    options: {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
    },
  };
};

export const CREATE_SCENARIO = (projectId: number, token: string): RequestFormat => {  
  return {
    url: `/project/${projectId}/scenario`,
    options: {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
    },
  };
};
