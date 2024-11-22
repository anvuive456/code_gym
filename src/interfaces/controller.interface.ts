import { Router, Request, Response, NextFunction } from "express";
import { renderToString } from "@vue/server-renderer";
import { Component, createSSRApp } from "vue";

export abstract class BaseController {
    public router: Router = Router();

    constructor() {
        this.initRoutes();
    }

    protected abstract getBasePath(): string;

    // Các controller kế thừa phải định nghĩa lại phương thức này
    protected abstract initRoutes(): void;

    // Một số phương thức tiện ích có thể được định nghĩa ở đây
    protected sendResponse(res: Response, statusCode: number, data: any) {
        return res.status(statusCode).json(data);
    }

    protected sendError(res: Response, statusCode: number, message: string) {
        return res.status(statusCode).json({ error: message });
    }

    protected renderView(res: Response, view: string, data?: any) {
        return res.render(view, data);
    }

    protected async renderVue(
        req: Request,
        res: Response,
        component: Component,
        props?: any,
        data?: TemplateOptions,
    ) {
        try {
            const ctx = {
                url: req.url,
            };
            // Create a Vue app with the specified component and props
            const app = createSSRApp(component, {
                ...props,
                userFullName: req.session.user?.username,
            });
            // Render the app to a string
            const html = await renderToString(app, ctx);
            // Send the rendered HTML as a response

            const {
                title = "",
                keywords = [],
                description = "",
                additionalLinks = [],
                additionalScripts = [],
                disableBS = false,
            } = data || {
                title: "CodeGym",
                keywords: [],
                additionalScripts: [],
                additionalLinks: [],
                description: "",
                disableBS: false,
            };

            // Generate additional link tags
            const links =
                additionalLinks &&
                additionalLinks
                    .map(link => `<link href="${link}" rel="stylesheet">`)
                    .join("\n");

            // Generate additional script tags
            const scripts =
                additionalScripts &&
                additionalScripts
                    .map(script => `<script src="${script}"></script>`)
                    .join("\n");

            const t = `
        <!DOCTYPE html>
        <html lang="en">

        <head>
            <meta charset="utf-8">
            <title>${title || "CodeGym"}</title>
            <meta content="width=device-width, initial-scale=1.0" name="viewport">
            ${keywords && `<meta content="${keywords}" name="keywords">`}
           ${description && `<meta content="${description}" name="description">`}

            <!-- Favicon -->
            <link href="http://localhost:3000/images/favicon.ico" rel="icon">

            <!-- Font Awesome -->
            <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.10.0/css/all.min.css" rel="stylesheet">

            <!-- Flaticon Font -->
            <link href=""http://localhost:3000/lib/flaticon/font/flaticon.css" rel="stylesheet">

            <!-- Customized Bootstrap Stylesheet -->
            ${disableBS ? "" : `<link href="http://localhost:3000/css/style.min.css" rel="stylesheet">`}

            <!-- Additional Stylesheets -->
            ${links && links}
        </head>

        <body class="bg-white">
        <div id="app" style="max-height:100vh;">
         ${html}
        </div>
        <!-- JavaScript Libraries -->
        ${
            disableBS
                ? ""
                : `
        <script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.bundle.min.js"></script>
        <script src="http://localhost:3000/lib/easing/easing.min.js"></script>
        <script src="http://localhost:3000/lib/waypoints/waypoints.min.js"></script>
        <script src="http://localhost:3000/lib/chart/chart.min.js"></script>
        <script src="http://localhost:3000/lib/owlcarousel/owl.carousel.min.js"></script>
        <script src="http://localhost:3000/lib/tempusdominus/js/moment.min.js"></script>
        <script src="http://localhost:3000/lib/tempusdominus/js/moment-timezone.min.js"></script>
        <script src="http://localhost:3000/lib/tempusdominus/js/tempusdominus-bootstrap-4.min.js"></script>
        `
        }


        <!-- Additional Scripts -->
        ${scripts && scripts}
        <!-- Add init state to Component -->
        <script>
        window.__INITIAL_PROPS__ = ${JSON.stringify(props)}
        console.log('init props in html',  window.__INITIAL_PROPS__)
        </script>
        <script src="/dist/client/bundle.client.js"></script>
        </body>

        </html>
    `;

            res.end(t);
        } catch (error) {
            console.error("Error rendering Vue component:", error);
            this.sendError(res, 500, "Không thể render view");
        }
    }

    // Ví dụ một middleware base có thể được sử dụng chung
    protected asyncWrapper(fn: Function) {
        return (req: Request, res: Response, next: NextFunction) =>
            fn(req, res, next).catch(next);
    }
}

interface TemplateOptions {
    title?: string;
    keywords?: string;
    description?: string;
    additionalLinks?: string[];
    additionalScripts?: string[];
    // Disable bootstrap for using other styles
    disableBS?: boolean;
}
