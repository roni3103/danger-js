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
    dslJSON.danger.settings.cliArgs.verbose = program.verbose;
    dslJSON.danger.settings.cliArgs.externalCiProvider = program.externalCiProvider;
    dslJSON.danger.settings.cliArgs.textOnly = program.textOnly;
    dslJSON.danger.settings.cliArgs.dangerfile = program.dangerfile;
    dslJSON.danger.settings.cliArgs.id = program.id;
    const dsl = await jsonToDSL(dslJSON.danger);
    return contextForDanger(dsl)
}