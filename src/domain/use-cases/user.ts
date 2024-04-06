import * as DTO from "@/presentation/http/dtos";
import { UseCase } from "@/domain/use-cases/base-use-case";

export interface AuthenticateUser
  extends UseCase<
  DTO.AuthenticateUserRequestDTO,
    null | DTO.AuthenticateUserResponseDTO
  > {}

export interface CreateUser
  extends UseCase<DTO.CreateUserRequestDTO, null | DTO.AuthenticateUserResponseDTO> {}
