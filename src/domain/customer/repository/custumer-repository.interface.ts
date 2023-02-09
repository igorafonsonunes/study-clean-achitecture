import Customer from "../entity/custumer";
import RepositoryInterface from "../../@shared/repository/repository-interface";

export default interface CustomerRepositoryInterface 
extends RepositoryInterface<Customer>{}