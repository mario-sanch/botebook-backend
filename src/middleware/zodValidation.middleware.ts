import { Request, Response, NextFunction } from "express";
import { ZodObject } from "zod";

const validateSchema =
  (schema: ZodObject) => (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (e: any) {
      const message = e.errors.map((err: any) => err.message);
      return res
        .status(400)
        .json({ message: message.join(","), success: false });
    }
  };

export default validateSchema;

/* return res.status(400)... etc causes the following to fail
```
router.post('/api', validateSchema(mySchema), createItem);
```
whereas if the return is removed, it works */
