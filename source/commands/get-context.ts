import { DangerDSLJSONType } from "../dsl/DangerDSL";
import { jsonToDSL } from "../runner/jsonToDSL";
import { contextForDanger, DangerContext } from "../runner/Dangerfile";

/**
 * Reads in the JSON string converts to a dsl object and gets the context
 * to be used for Danger.
 * @param JSONString {string} from stdin
 * @param program {any} commander
 * @returns {Promise<DangerContext>} context for danger
 */
export async function getContext(JSONString: string, program: any): Promise<DangerContext> {
    const dslJSON = JSON.parse(JSONString) as { danger: DangerDSLJSONType }
    dslJSON.danger.settings.cliArgs.base = program.base;
    const dsl = await jsonToDSL(dslJSON.danger);
    return contextForDanger(dsl)
}