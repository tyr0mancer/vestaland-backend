import {Response} from "express";
import {ApiError} from "../shared-types";

export function handleError(res: Response, error: any) {
  if (isApiError(error))
    return res.status(error.status).json(error)

  const errorMessage: ApiError = {status: 500, message: "Fehler", description: "Details siehe error-logs"}
  console.error(error)
  return res.status(500).json(errorMessage)
}

export function sendErrorResponse(res: Response, status: number = 500, message: string = 'Error', description?: string, error?: any) {
  const errorMessage: ApiError = {status, message, description, error}
  return res.status(status).json(errorMessage)
}

function isApiError(error: any): error is ApiError {
  return error && typeof error.status === 'number' && typeof error.message === 'string';
}

export function handleGenericServerError(res: Response, error: any) {
  const errorMessage: ApiError = {status: 500, message: "Fehler", description: "Details siehe error-logs"}
  console.error(error)
  return res.status(500).json(errorMessage)
}
