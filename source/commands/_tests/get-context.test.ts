import { getContext } from '../get-context';

import { DangerContext } from "../../runner/Dangerfile";

jest.mock("../../runner/jsonToDSL")
const foo = require("../../runner/jsonToDSL");
// foo is a mock function
foo.jsonToDSL = jest.fn(() => Promise.resolve({ danger: '' }));

jest.mock("../../runner/Dangerfile");
const bar = require("../../runner/Dangerfile");

// bar is a mock function
bar.contextForDanger = jest.fn(() => Promise.resolve({ danger: '' }));

describe('commands/get-context', () => {

    let jsonString;
    let program;
    let context;
    beforeEach(async () => {
        jsonString = JSON.stringify({
            danger: {
                settings: {
                    github: {
                        baseURL: ''
                    },
                    cliArgs: {}
                }
            }

        })

        program = {
            base: 'develop',
            verbose: true,
            externalCiProvider: 'aprovider',
            textOnly: false,
            dangerfile: 'afile',
            id: '123'

        }

    })


    it('should have a function called get context', () => {
        expect(getContext).toBeTruthy();
    });

    it('should return a context', async () => {
        context = await getContext(jsonString, program);
        expect(context).toBeTruthy();
    });

    it('should set the base from the input command', async () => {
        context = await getContext(jsonString, program);
        expect(context.danger).toEqual('')
    });



    it('should call jsonToDSL with danger object', () => {
        expect(foo.jsonToDSL).toHaveBeenCalledWith({
            settings: {
                github: {
                    baseURL: ''
                },
                cliArgs: {
                    base: 'develop',
                    verbose: true,
                    externalCiProvider: 'aprovider',
                    textOnly: false,
                    dangerfile: 'afile',
                    id: '123'


                }
            }
        })
    })

    it('should call context for danger with dsl', () => {
        expect(bar.contextForDanger).toHaveBeenCalledWith({ danger: '' });
    })

})