import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CapacitorSQLite, capSQLiteChanges, capSQLiteValues } from '@capacitor-community/sqlite';
import { Device } from '@capacitor/device';
import { Preferences } from '@capacitor/preferences';
import { JsonSQLite } from 'jeep-sqlite/dist/types/interfaces/interfaces';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SqliteService {


  public dbReady: BehaviorSubject<boolean>;
  public isWeb: boolean;
  public isIOS: boolean;
  public dbName: string;

  constructor(
    private http: HttpClient
  ) {
    this.dbReady = new BehaviorSubject(false);
    this.isWeb = false;
    this.isIOS = false;
    this.dbName = '';
  }

  async init() {

    const info = await Device.getInfo();
    const sqlite = CapacitorSQLite as any;

    if (info.platform == 'android') {
      try {
        await sqlite.requestPermissions();
      } catch (error) {
        console.error("Esta app necesita permisos para funcionar")
      }
    } else if (info.platform == 'web') {
      this.isWeb = true;
      await sqlite.initWebStore();
    } else if (info.platform == 'ios') {
      this.isIOS = true;
    }

    this.setupDatabase();

  }

  async setupDatabase() {

    const dbSetup = await Preferences.get({ key: 'first_setup_key' })

    if (!dbSetup.value) {
      this.downloadDatabase();
    } else {
      this.dbName = await this.getDbName();
      await CapacitorSQLite.createConnection({ database: this.dbName });
      await CapacitorSQLite.open({ database: this.dbName })
      this.dbReady.next(true);
    }


  }

  downloadDatabase() {

    this.http.get('assets/db/db.json').subscribe(async (jsonExport: JsonSQLite) => {

      const jsonstring = JSON.stringify(jsonExport);
      const isValid = await CapacitorSQLite.isJsonValid({ jsonstring });

      if (isValid.result) {

        this.dbName = jsonExport.database;
        await CapacitorSQLite.importFromJson({ jsonstring });
        await CapacitorSQLite.createConnection({ database: this.dbName });
        await CapacitorSQLite.open({ database: this.dbName })

        await Preferences.set({ key: 'first_setup_key', value: '1' })
        await Preferences.set({ key: 'dbname', value: this.dbName })

        this.create('cristian', 'cristian@gmail.com', 'CRIS');

        this.dbReady.next(true);

      }

    })

  }

  async getDbName() {

    if (!this.dbName) {
      const dbname = await Preferences.get({ key: 'dbname' })
      if (dbname.value) {
        this.dbName = dbname.value
      }
    }
    return this.dbName;
  }

  async create(nombre: string, correo: string, contraseña: string){

    let sql = 'INSERT INTO Usuario_alumno VALUES(?,?,?)';

    const dbName = await this.getDbName();

    return CapacitorSQLite.executeSet({
      database: dbName,
      set: [
        {
          statement: sql,
          values: [
            nombre, correo, contraseña
          ]
        }
      ]
    }).then((changes: capSQLiteChanges) => {
      
      if (this.isWeb) {
        CapacitorSQLite.saveToStore({ database: dbName });
      }
      return changes;
    }).catch(err => Promise.reject(err))


  }


async read() {
  let sql = 'SELECT * FROM Usuario_alumno';

  const dbName = await this.getDbName();

  try {
    const response = await CapacitorSQLite.query({
      database: dbName,
      statement: sql,
      values: []
    });

    console.log("Respuesta de la consulta:", response);

    let Usuario_alumno: any[] = [];

    if (response.values?.length) {
      for (let index = 0; index < response.values.length; index++) {
        const row = response.values[index];

        const nombre = row.ua_nom;
        const correo = row.ua_cor;
        const contraseña = row.ua_con;

        Usuario_alumno.push({ nom_ua: nombre, cor_ua: correo, con_ua: contraseña });
      }
    }

    return Usuario_alumno;
  } catch (err) {
    console.error("Error al ejecutar la consulta:", err);
    return Promise.reject(err);
  }
}

  
  

  async update(newContraseña: string, originalContraseña: string) {
    let sql = 'UPDATE Usuario_alumno SET ua_con=? WHERE ua_con=?';
    const dbName = await this.getDbName();
    return CapacitorSQLite.executeSet({
      database: dbName,
      set: [
        {
          statement: sql,
          values: [
            newContraseña,
            originalContraseña
          ]
        }
      ]
    }).then((changes: capSQLiteChanges) => {
      if (this.isWeb) {
        CapacitorSQLite.saveToStore({ database: dbName });
      }
      return changes;
    }).catch(err => Promise.reject(err))
  }

}
