
export const PINTEREST_CLIENT_ID = "1506052";

export const PINTEREST_CLIENT_SECRET = "";

export const PINTEREST_REDIRECT_URL = `${process.env.REACT_APP_UI_URL}/pinterestStatus`;

export const PINTEREST_SCOPE = "ads:read boards:read boards:read_secret boards:write boards:write_secret "
                +"pins:read pins:read_secret pins:write pins:write_secret user_accounts:read catalogs:read catalogs:write";

export const PINTEREST_CODE = "code";

export const PINTEREST_AUTH_CODE = `${process.env.REACT_APP_API_INTEGRATION_URL}/pinterest/authCode`;
