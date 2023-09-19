// import { Errorlike, Server } from "bun";

// export class Router {
//   static handleRequest = (req: Request): Response => {
//     const url = new URL(req.url);

//     switch (url.pathname) {
//       case "/":
//         return new Response("Hello World!", {
//           status: 200,
//           headers: {
//             "content-type": "text/plain",
//           },
//         });

//       default:
//         return new Response("Not Found", {
//           status: 404,
//           headers: {
//             "content-type": "text/plain",
//           },
//         });
//     }
//   };

//   static handleError = (
//     server: Server,
//     req: Errorlike
//   ): void | Response | Promise<Response> | Promise<undefined> | undefined => {
//     return new Response("Internal Server Error", {
//       status: 500,
//       headers: {
//         "content-type": "text/plain",
//       },
//     });
//   };
// }
