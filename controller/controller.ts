import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status-codes";
import productmodel from "../models/user";

export const postFunction = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  {
    try {
      console.log("Entering the Post Function");
      const { productName, ...rest } = req.body;
      const other = rest;
      console.log(rest);
      // const Created = await productmodel.insertMany([{ productName, other }]);
      const Created = await new productmodel({ productName, ...rest }).save();
      console.log(Created);
      if (Created !== null || Created) {
        return res.status(httpStatus.ACCEPTED).json({
          response_time: new Date(),
          data: {
            Created,
          },
        });
      }
    } catch (err: any) {
      return res.status(httpStatus.CONFLICT).json({
        message: "CONFLICT",
      });
    }
  }
};

export const getFunction = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log("Entering the Get Function");
    const get = await productmodel.find({}); //find()
    if (get.length > 0) {
      return res.status(httpStatus.OK).json({
        response_time: new Date(),
        data: {
          get,
        },
        DatabaseSize: get.length,
      });
    }
    if (get.length === 0) {
      return res.status(httpStatus.BAD_GATEWAY).json({
        message: "No data in database",
      });
    }
  } catch (err: any) {
    return res.status(httpStatus.NOT_FOUND).json({
      message: "Not Found",
    });
  }
};

export const getFunctionbyFilter = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log("Entering getFunctionByFilter");
    const id: number = parseInt(req.params.id, 10);
    // const filter = { product_Id: product_id, productName: productName };
    const gettingFilter = await productmodel.findOne({ product_id: id });
    //or you can use findOne({productName : productName})
    if (gettingFilter) {
      return res.status(httpStatus.ACCEPTED).json({
        response_time: new Date(),
        data: {
          gettingFilter,
        },
      });
    }
  } catch (err: any) {
    return res.status(httpStatus.NOT_FOUND).json({
      message: "NOT FOUND",
    });
  }
};

export const deleteFunction = async (req: Request, res: Response) => {
  try {
    console.log("Entering the delete Function");
    const { productName } = req.body;
    const hold = productName;
    let filter = { productName: hold };
    const deleteFunc = await productmodel.findOneAndDelete(filter);
    if (deleteFunc) {
      return res.status(httpStatus.OK).json({
        success: true,
        message: "Data Deleted SuccessFully",
        data: {
          deleteFunc,
        },
      });
    }
  } catch (err: any) {
    return res.status(500).json({
      error: true,
      message: "INTERNAL SERVER ERROR",
    });
  }
};

export const putFunction = async (req: Request, res: Response) => {
  try {
    console.log("Entering the Put Function");
    const { productName, ...rest } = req.body;
    //to check console.log(rest);
    const hold = productName;
    const putFunc = await productmodel.replaceOne({ productName: hold }, rest);
    if (putFunc) {
      return res.status(httpStatus.OK).json({
        response_time: new Date(),
        message: "Updating the every Data from Collection",
        data: {
          putFunc,
        },
      });
    }
  } catch (err: any) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: "INTERNAL SERVER ERROR",
    });
  }
};

export const patchFunction = async (req: Request, res: Response) => {
  try {
    console.log("Entering into the Patch Function");
    const { ...rest } = req.body;
    const id: number = parseInt(req.params.id, 10);
    if (typeof req.params.id === "string") {
      return false;
    }
    const patchFunc = await productmodel.findOneAndUpdate(
      { product_id: id },
      rest
    );
    if (patchFunc) {
      return res.status(httpStatus.OK).json({
        response_time: new Date(),
        message: "Patching the needed Data",
        data: {
          patchFunc,
        },
      });
    }
  } catch (err: any) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: "INTERNAL SERVER ERROR",
    });
  }
};
