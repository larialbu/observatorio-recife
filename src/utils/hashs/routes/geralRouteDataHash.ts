import { aeroportosRouteDataHash } from "./aeroportosRouteDataHash";
import { balancaComercialRouteDataHash } from "./balancaComercialRouteDataHash";
import { capagRouteDataHash } from "./capagRouteDataHash";
import { empregosRouteDataHash } from "./empregosRouteDataHash";
import { empresasRouteDataHash } from "./empresasRouteDataHash";
import { ipcaRouteDataHash } from "./ipcaRouteDataHash";
import { microCagedRouteDataHash } from "./microCagedRouteDataHash";
import { pibRouteDataHash } from "./pibRouteDataHash";
import { portosRouteDataHash } from "./portosRouteDataHash";
import { raisRouteDataHash } from "./raisRouteDataHash";
import { rankingRouteDataHash } from "./rankingRouteDataHash";
import { tributosRouteDataHash } from "./tributosRouteDataHash";

export const geralRouteDataHash = {
    ...empresasRouteDataHash,
    ...aeroportosRouteDataHash,
    ...balancaComercialRouteDataHash,
    ...ipcaRouteDataHash,
    ...rankingRouteDataHash,
    ...pibRouteDataHash,
    ...portosRouteDataHash,
    ...empregosRouteDataHash,
    ...raisRouteDataHash,
    ...microCagedRouteDataHash,
    ...tributosRouteDataHash,
    ...capagRouteDataHash
}  