import toastr from 'toastr'

// DEMO
// https://codeseven.github.io/toastr/demo.html

toastr.options = {
    positionClass: 'toast-top-full-width',
    hideDuration: 300,
    closeHtml : '<button><i class="icon-off"></i></button>',
    timeOut: 5000,
    closeButton : true,
    progressBar : true,
} 

export const _Toastr = {
    error (msg){
        toastr.error(`${msg} `);
    },
    success (msg){
        toastr.success(`${msg} `);
    },
    warning (msg){
        toastr.warning(`${msg} `);
    },
    info(msg){
        toastr.info(`${msg} `);
    },
    autoMsg(code, msg){
        switch (code) {
            case 200:
                toastr.success(`${msg} `);
                break;

            case 201:
                toastr.error(`${msg} `);
                break;

            case 202:
                toastr.warning(`${msg} `);
                break;

      }  
    }
 };