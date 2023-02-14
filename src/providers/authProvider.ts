import Keycloak from "keycloak-js";
import { AuthProvider } from "@pankod/refine-core";
import axios from "axios";

export function getAuthProvider(keycloak: Keycloak) {
  const authProvider: AuthProvider = {
    login: async () => {
      const urlSearchParams = new URLSearchParams(window.location.search);
      const { to } = Object.fromEntries(urlSearchParams.entries());
      await keycloak.login({
        redirectUri: to ? `${window.location.origin}${to}` : undefined,
      });
      return Promise.resolve(false);
    },
    logout: async () => {
      await keycloak.logout({
        redirectUri: window.location.origin,
      });
      return Promise.resolve();
    },
    checkError: () => Promise.resolve(),
    checkAuth: async () => {
      try {
        const { token } = keycloak;
        if (token) {
          axios.defaults.headers.common = {
            Authorization: `Bearer ${token}`,
          };
          return Promise.resolve();
        } else {
          return Promise.reject();
        }
      } catch (error) {
        return Promise.reject();
      }
    },
    getPermissions: () => Promise.resolve(),
    getUserIdentity: async () => {
      if (keycloak?.tokenParsed) {
        return Promise.resolve({
          name: keycloak.tokenParsed.family_name,
        });
      }
      return Promise.reject();
    },
  };
  return { authProvider };
}
