(function () {
    const annotate = RoughNotation.annotate;
    const annotationGroup = RoughNotation.annotationGroup;
    const $ = (t) => document.querySelector(t);

    // export interface RoughAnnotationConfig {
    //   type: RoughAnnotationType;
    //   animate?: boolean; // defaults to true
    //   animationDuration?: number; // defaulst to 1000ms
    //   animationDelay?: number; // default = 0
    //   color?: string; // defaults to currentColor
    //   strokeWidth?: number; // default based on type
    //   padding?: number; // defaults to 5px
    // }

    {
        // top
        const a1 = annotate($('section a.abox'), {type: 'box', color: '#F44336', padding: 3});
        const a2 = annotate($('header h1 span'), { type: 'strike-through', color: '#1B5E20', strokeWidth: 4 });
        // const a3 = annotate($('header a'), { type: 'underline', color: '#2196F3', padding: 3, strokeWidth: 3 });
        // const a4 = annotate($('header span.acircle'), { type: 'circle', color: '#F44336', padding: 5 });
        const ag = annotationGroup([a1, a2]);
        ag.show();
    }
})();