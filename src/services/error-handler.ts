import {Response} from "express";
import {ApiErrorResponse} from "../shared-types/types";

export function handleError(res: Response, error: any) {
  if (isApiError(error))
    return res.status(error.status).json(error)

  const errorMessage: ApiErrorResponse = {status: 500, message: "Fehler", description: "Details siehe error-logs"}
  console.error(error)
  return res.status(500).json(errorMessage)
}

export function sendErrorResponse(res: Response, status: number = 500, message: string = 'Error', description?: string, error?: any): void {
  const errorMessage: ApiErrorResponse = {status, message, description, error}
  res.status(status).json(errorMessage)
}

function isApiError(error: any): error is ApiErrorResponse {
  return error && typeof error.status === 'number' && typeof error.message === 'string';
}

export function handleGenericServerError(res: Response, error: any) {
  const errorMessage: ApiErrorResponse = {status: 500, message: "Fehler", description: "Details siehe error-logs"}
  console.error(error)
  return res.status(500).json(errorMessage)
}
