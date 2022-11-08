import { Request,Response,NextFunction } from "express";

const authenticate = (req: Request,
    res: Response,
    next: NextFunction) => {
    // console.log(req.isAuthenticated());

    // console.log(req.user)
    if (req.isAuthenticated()) {
      next();
    } else {
      return res.send("<h4>User is not authenticated in the server 👎🏽</h4>");
    }
  };
  
  export { authenticate };