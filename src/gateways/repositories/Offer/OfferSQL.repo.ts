import Offer, { OfferProps } from "../../../core/entities/Offer";
import DatabaseError from "../../../errors/DatabaseError";
import ISQLService from "../../../infra/ISQLService";
import IOfferRepository from "./IOffer.repo";

export default class OfferSQLRepository implements IOfferRepository {
  constructor(public sqlProvider: ISQLService) {}

  getAll(): Promise<Offer[]> {
    return new Promise((resolve, reject) => {
      this.sqlProvider
        .query<OfferProps>("SELECT * FROM Offers")
        .then((result) => resolve(result.map((obj) => Offer.create(obj))))
        .catch((err) => {
          reject(new DatabaseError(err.message));
        });
    });
  }
  getByCategory(category: string): Promise<Offer[]> {
    return new Promise((resolve, reject) => {
      this.sqlProvider
        .query<OfferProps>("SELECT * FROM Offers WHERE category = $1", [
          category,
        ])
        .then((result) => resolve(result.map((obj) => Offer.create(obj))))
        .catch((err) => {
          reject(new DatabaseError(err.message));
        });
    });
  }
  getByStudent(studentId: number): Promise<Offer[]> {
    return new Promise((resolve, reject) => {
      this.sqlProvider
        .query<OfferProps>("SELECT * FROM Offers WHERE category = $1", [
          String(studentId).valueOf(),
        ])
        .then((result) => resolve(result.map((obj) => Offer.create(obj))))
        .catch((err) => {
          reject(new DatabaseError(err.message));
        });
    });
  }
  getById(id: number): Promise<Offer | null> {
    return new Promise((resolve, reject) => {
      this.sqlProvider
        .findOne<OfferProps>("SELECT * FROM Offers WHERE category = $1", [
          String(id).valueOf(),
        ])
        .then((result) =>
          resolve(result !== null ? Offer.create(result) : null)
        )
        .catch((err) => {
          reject(new DatabaseError(err.message));
        });
    });
  }
  create(offer: Offer): Promise<Number> {
    return new Promise((resolve, reject) => {
      this.sqlProvider
        .insert<Offer>("Offers", offer)
        .then((id) => resolve(id))
        .catch((err) => reject(new DatabaseError(err.message)));
    });
  }
  update(offer: Offer): Promise<Boolean> {
    return new Promise((resolve, reject) => {
      this.sqlProvider
        .update("Offers", offer, { id: offer.id })
        .then(() => resolve(true))
        .catch((err) => reject(new DatabaseError(err.message)));
    });
  }
  delete(id: number): Promise<Boolean> {
    return new Promise((resolve, reject) => {
      this.sqlProvider
        .delete("Offers", { id: id })
        .then(() => resolve(true))
        .catch((err) => reject(new DatabaseError(err.message)));
    });
  }
}
