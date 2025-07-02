import { jest } from '@jest/globals'
import db from '../../config/db'
import { connectDB } from "../../server";

jest.mock('../../config/db')

describe('connectDB', () => {
  it('should handle database connection error', async () => {
    const mockAuthenticate = jest.spyOn(db, 'authenticate')
      .mockRejectedValueOnce(new Error('Hubo un error al conectar a la BD'))

    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {})

    await connectDB()

    expect(mockAuthenticate).toHaveBeenCalled()
    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining('Hubo un error al conectar a la BD')
    )

    consoleSpy.mockRestore()
  })
})
