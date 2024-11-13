import { UserDtoOut } from "../../shared/models"
import { HttpFactory } from "../factories"

const base = '/user'
const http =  HttpFactory(base)

export const getUser = () => {
  return http.get<UserDtoOut>("me")
}