type Method = 'head' | 'options' | 'put' | 'post' | 'patch' | 'delete' | 'get';

interface RequestFormat {
  url: string;
  options: {
    method: Method,
    headers?: {
        'Content-Type'?: string;
        'Authorization'?: string;
    },
  }
}

export const CREATE_USER = (): RequestFormat => {
	return {
		url: '/user/register',
		options: {
			method: 'post',
			headers: {
				'Content-Type': 'application/json',
			},
		},
	};
};

export const AUTH_USER = (): RequestFormat => {
	return {
		url: '/user/auth',
		options: {
			method: 'post',
			headers: {
				'Content-Type': 'application/json',
			},
		},
	};
};

export const VALIDATE_USER = (): RequestFormat => {
	return {
		url: '/user/validate-user',
		options: {
			method: 'post',
			headers: {
				'Content-Type': 'application/json',
			},
		},
	};
};

export const FORGOT_PASSWORD = (): RequestFormat => {
	return {
		url: '/user/forgot-password',
		options: {
			method: 'post',
			headers: {
				'Content-Type': 'application/json',
			},
		},
	};
};

export const VERIFY_RECOVERY_CODE = (): RequestFormat => {
	return {
		url: '/user/verify-recovery-code',
		options: {
			method: 'post',
			headers: {
				'Content-Type': 'application/json',
			},
		},
	};
};

export const RESET_PASSWORD = (): RequestFormat => {
	return {
		url: '/user/reset-password',
		options: {
			method: 'post',
			headers: {
				'Content-Type': 'application/json',
			},
		},
	};
};

export const GET_ME = (token: string): RequestFormat => {
	return {
		url: '/user/me',
		options: {
			method: 'get',
			headers: {
				'Authorization': `Bearer ${token}`
			}
		},
	};
};

export const GET_PROJECTS = (token: string): RequestFormat => {
	return {
		url: '/project',
		options: {
			method: 'get',
			headers: {
				'Authorization': `Bearer ${token}`
			}
		},
	};
};

export const GET_PROJECT = (id: string, token?: string): RequestFormat => {
	return {
		url: `/project/${id}`,
		options: {
			method: 'get',
			headers: {
				'Authorization': `Bearer ${token}`
			}
		},
	};
};

export const IS_PROJECT_PRIVATE = (id: string): RequestFormat => {
	return {
		url: `/project/check-privacy/${id}`,
		options: {
			method: 'get',
		},
	};
};

export const GET_SCENARIO = (projectId: string, scenarioId: string, token: string): RequestFormat => {
	return {
		url: `/project/${projectId}/scenario/${scenarioId}`,
		options: {
			method: 'get',
			headers: {
				'Authorization': `Bearer ${token}`
			}
		},
	};
};

export const CREATE_PROJECT = (token: string): RequestFormat => {  
	return {
		url: '/project',
		options: {
			method: 'post',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${token}`
			},
		},
	};
};

export const UPDATE_PROJECT = (id: string, token: string): RequestFormat => {  
	return {
		url: `/project/${id}`,
		options: {
			method: 'patch',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${token}`
			},
		},
	};
};

export const DELETE_PROJECT = (id: string, token: string): RequestFormat => {  
	return {
		url: `/project/${id}`,
		options: {
			method: 'delete',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${token}`
			},
		},
	};
};

export const DELETE_SCENARIO = (projectId: string, scenarioId: string, token: string): RequestFormat => {  
	return {
		url: `/project/${projectId}/scenario/${scenarioId}`,
		options: {
			method: 'delete',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${token}`
			},
		},
	};
};
export const DELETE_SYMBOL = (projectId: string, symbolId: string, token: string): RequestFormat => {  
	return {
		url: `/project/${projectId}/symbol/${symbolId}`,
		options: {
			method: 'delete',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${token}`
			},
		},
	};
};

export const CREATE_SYMBOL = (projectId: string, token: string): RequestFormat => {  
	return {
		url: `/project/${projectId}/symbol`,
		options: {
			method: 'post',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${token}`
			},
		},
	};
};

export const CREATE_SCENARIO = (projectId: string, token: string): RequestFormat => {  
	return {
		url: `/project/${projectId}/scenario`,
		options: {
			method: 'post',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${token}`
			},
		},
	};
};

export const CREATE_MULTIPLE_SCENARIOS = (projectId: string, token: string): RequestFormat => {  
	return {
		url: `/project/${projectId}/scenario/many`,
		options: {
			method: 'post',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${token}`
			},
		},
	};
};

export const UPDATE_SCENARIO = (projectId: string, scenarioId: string, token: string): RequestFormat => {  
	return {
		url: `/project/${projectId}/scenario/${scenarioId}`,
		options: {
			method: 'patch',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${token}`
			},
		},
	};
};

export const UPDATE_SYMBOL = (projectId: string, symbolId: string, token: string): RequestFormat => {  
	return {
		url: `/project/${projectId}/symbol/${symbolId}`,
		options: {
			method: 'patch',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${token}`
			},
		},
	};
};

export const CREATE_RESOURCE = (projectId: string, scenarioId: string, token: string): RequestFormat => {  
	return {
		url: `/project/${projectId}/scenario/${scenarioId}/resource`,
		options: {
			method: 'post',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${token}`
			},
		},
	};
};

export const CREATE_RESTRICTION = (projectId: string, scenarioId: string, token: string): RequestFormat => {  
	return {
		url: `/project/${projectId}/scenario/${scenarioId}/restriction`,
		options: {
			method: 'post',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${token}`
			},
		},
	};
};

export const ADD_USER_TO_PROJECT = (projectId: string, token: string): RequestFormat => {  
	return {
		url: `/user/add/${projectId}`,
		options: {
			method: 'post',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${token}`
			},
		},
	};
};

export const CHANGE_USER_ROLE = (projectId: string, token: string): RequestFormat => {  
	return {
		url: `/user/change-role/${projectId}`,
		options: {
			method: 'patch',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${token}`
			},
		},
	};
};

export const REMOVE_USER = (projectId: string, token: string): RequestFormat => {  
	return {
		url: `/user/remove/${projectId}`,
		options: {
			method: 'patch',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${token}`
			},
		},
	};
};

export const UPDATE_USER = (token: string): RequestFormat => {  
	return {
		url: '/user',
		options: {
			method: 'patch',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${token}`
			},
		},
	};
};

export const GET_CHANGES_BY_USER_PROJECTS = (token: string): RequestFormat => {  
	return {
		url: '/change/all',
		options: {
			method: 'get',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${token}`
			},
		},
	};
};
