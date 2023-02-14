import { useKeycloak } from "@react-keycloak/web";
import { getAuthProvider } from "../providers/authProvider";

export function useKeycloakAuthProvider() {
  const { keycloak, initialized } = useKeycloak();
  const { authProvider } = getAuthProvider(keycloak);

  return { initialized, authProvider };
}
