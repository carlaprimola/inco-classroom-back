import db from '../database/db';
import { DataTypes } from 'sequelize';
import UsersModel from '../models/UsersModel';
import CoursesModel from '../models/CoursesModel';
import AcademicTrackingModel from '../models/AcademicTrackingModel';
import StudentModel from '../models/StudentModel'; // Importa el modelo de estudiante

// Mock de las funciones de Sequelize
jest.mock('../database/db', () => ({
    define: jest.fn().mockImplementation((modelName, schema, options) => ({
        modelName,
        schema,
        options,
        belongsTo: jest.fn(),
    })),
}));

describe('StudentModel', () => {
    afterEach(() => {
        jest.clearAllMocks(); // Limpia todos los mocks después de cada prueba
    });

    it('should define the Student model correctly', () => {
        // Llama al modelo de estudiante
        expect(StudentModel).toBeDefined();

        // Verifica que se haya llamado a la función define de Sequelize con los parámetros correctos
        expect(db.define).toHaveBeenCalledWith('estudiantes', {
            ID: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            usuarios_ID: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: UsersModel,
                    key: 'ID'
                }
            },
            cursos_ID: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: CoursesModel,
                    key: 'ID'
                }
            },
            seguimientoacademico_ID: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: AcademicTrackingModel,
                    key: 'ID'
                }
            }
        }, {
            timestamps: false
        });

        // Verifica que se haya llamado a la función belongsTo de Sequelize con los parámetros correctos
        expect(StudentModel.belongsTo).toHaveBeenCalledWith(UsersModel, { foreignKey: 'usuarios_ID' });
        expect(StudentModel.belongsTo).toHaveBeenCalledWith(CoursesModel, { foreignKey: 'cursos_ID' });
        expect(StudentModel.belongsTo).toHaveBeenCalledWith(AcademicTrackingModel, { foreignKey: 'seguimientoacademico_ID' });
    });
});
