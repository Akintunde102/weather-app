import createUIIndication from './createUIIndication';

describe('createUIIndication', () => {
    it('should set state to true when calling start', () => {
        const stateSet = jest.fn();
        const uiIndication = createUIIndication(stateSet);
        uiIndication.start();
        expect(stateSet).toHaveBeenCalledWith(true);
    });

    it('should set state to false when calling end', () => {
        const stateSet = jest.fn();
        const uiIndication = createUIIndication(stateSet);

        uiIndication.end();

        expect(stateSet).toHaveBeenCalledWith(false);
    });

    it('should set state to true when calling startEnd, then false after delay', async () => {
        const stateSet = jest.fn();
        const uiIndication = createUIIndication(stateSet);

        uiIndication.startEnd({ delay: 1000 });

        expect(stateSet).toHaveBeenCalledWith(true);

        await new Promise(resolve => setTimeout(resolve, 1000));

        expect(stateSet).toHaveBeenCalledWith(false);
    });

    it('should set state to false after delay when calling delayed', async () => {
        const stateSet = jest.fn();
        const uiIndication = createUIIndication(stateSet);

        uiIndication.delayed({ delay: 1000 });

        await new Promise(resolve => setTimeout(resolve, 1000));

        expect(stateSet).toHaveBeenCalledWith(false);
    });

    it('should set state to true after delay when calling delayed', async () => {
        const stateSet = jest.fn();
        const uiIndication = createUIIndication(stateSet);

        uiIndication.delayed({ delay: 1000, value: true });

        await new Promise(resolve => setTimeout(resolve, 1000));

        expect(stateSet).toHaveBeenCalledWith(true);
    });
});
