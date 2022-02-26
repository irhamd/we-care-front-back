import { ubahText } from "../Crypto";
import { globalText } from "../Text/GlobalText";
let sess = sessionStorage.getItem(globalText.x_auth_resu)
const decrypt = ubahText(sess != null ? sess :"")

export const dataUser = JSON.parse(decrypt ? decrypt : "{}");
