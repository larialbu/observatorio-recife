import { aeroportosRouteDataHash } from "./aeroportosRouteDataHash";
import { balancaComercialRouteDataHash } from "./balancaComercialRouteDataHash";
import { empresasRouteDataHash } from "./empresasRouteDataHash";
import { ipcaRouteDataHash } from "./ipcaRouteDataHash";
import { pibRouteDataHash } from "./pibRouteDataHash";
import { portosRouteDataHash } from "./portosRouteDataHash";
import { rankingRouteDataHash } from "./rankingRouteDataHash";

export const geralRouteDataHash = {
    ...empresasRouteDataHash,
    ...aeroportosRouteDataHash,
    ...balancaComercialRouteDataHash,
    ...ipcaRouteDataHash,
    ...rankingRouteDataHash,
    ...pibRouteDataHash,
    ...portosRouteDataHash,
}  