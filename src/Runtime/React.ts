module Fayde {
    interface IReactable {
        $$reaction_sources: any[];
        $$reactions: IReaction[];
    }
    interface IReaction {
        (): void;
    }

    export function Incite (obj: any) {
        if (!dobj)
            return;
        var reactions = (<IReactable>dobj).$$reactions;
        if (!reactions)
            return;
        for (var i = 0; i < reactions.length; i++) {
            reactions[i]();
        }
    }

    export function ReactTo (obj: any, scope: any, changed: () => void) {
        if (!obj)
            return;
        var rs = obj.$$reaction_sources = obj.$$reaction_sources || [];
        rs.push(scope);
        var reactions = obj.$$reactions = obj.$$reactions || [];
        reactions.push(changed);
    }

    export function UnreactTo (obj: any, scope: any) {
        if (!obj)
            return;
        var reactions = obj.$$reactions;
        if (!reactions)
            return;
        var rs = obj.$$reaction_sources;
        var index = rs.indexOf(scope);
        if (index < 0)
            return;
        rs.splice(index, 1);
        reactions.splice(index, 1);
    }
}