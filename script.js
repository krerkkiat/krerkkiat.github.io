// Trigger rough notation.
function triggerAnnotation() {
    const annotate = RoughNotation.annotate;
    const annotationGroup = RoughNotation.annotationGroup;
    const $ = (t) => document.querySelector(t);

    // top
    const a1 = annotate($('section a.abox'), {type: 'box', color: '#F44336', padding: 3});
    const a2 = annotate($('header h1 span'), {type: 'strike-through', color: '#1B5E20', strokeWidth: 4});
    // const a3 = annotate($('header a'), { type: 'underline', color: '#2196F3', padding: 3, strokeWidth: 3 });
    // const a4 = annotate($('header span.acircle'), { type: 'circle', color: '#F44336', padding: 5 });
    const ag = annotationGroup([a1, a2]);
    ag.show();
}

function initApp() {
    triggerAnnotation();
    var uiConfig = {
        callbacks: {
            signInSuccessWithAuthResult: (authResult, redirectUrl) => {
                return true;
            },
            uiShown: () => {
                document.getElementById('loader').style.display = 'none';
            },
        },
        signInSuccessUrl: '#',
        signInOptions: [
            {
                provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
                signInMethod: firebase.auth.EmailAuthProvider.EMAIL_LINK_SIGN_IN_METHOD
            }
        ],
    };
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            document.getElementById('signed-in').style.display = 'inline';
            document.getElementById('signed-out').style.display = 'none';
            document.getElementById('loader').style.display = 'none';
            document.getElementById('sign-out-btn').style.display = 'inline';
            document.getElementById('sign-out-btn').addEventListener('click', (e) => {
                firebase.auth().signOut().then(function () {
                    // Sign-out successful.
                }).catch(function (error) {
                    // An error happened.
                });
            });
        } else {
            document.getElementById('signed-in').style.display = 'none';
            document.getElementById('signed-out').style.display = 'inline';
            document.getElementById('sign-out-btn').style.display = 'none';
            ui.start('#firebaseui-auth-container', uiConfig);
        }
    });
}

window.onload = initApp();