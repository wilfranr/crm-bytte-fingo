import pandas as pd
import tkinter as tk
from tkinter import ttk
from tkinter import messagebox
from tkinter import filedialog
import threading
import os
from datetime import datetime
import locale
import sys

# Detectar la ubicación del ejecutable o script
if getattr(sys, 'frozen', False):
    # Si el programa está empaquetado con PyInstaller
    application_path = sys._MEIPASS
else:
    # Si se está ejecutando desde el código fuente
    application_path = os.path.dirname(os.path.abspath(__file__))

# Ruta al archivo Consolidado_miid.xlsx
file_path = os.path.join(application_path, 'Consolidado_miid.xlsx')

# Usar esta ruta en el programa
try:
    # Ejemplo de uso: cargar el archivo
    df2 = pd.read_excel(file_path, sheet_name='Base', header=0)
    print("Archivo cargado con éxito.")
except FileNotFoundError:
    print(f"No se encontró el archivo: {file_path}")

# Configurar la localización a español
locale.setlocale(locale.LC_TIME, 'es_ES.UTF-8')

def log_message(message):
    """Función para agregar mensajes al área de logs."""
    logs_text.insert(tk.END, message + '\n')
    logs_text.see(tk.END)  # Desplazar el scroll automáticamente hacia abajo

def procesar_documentos_miid(file_path):
    try:
        log_message(f"Cargando archivo Excel desde: {file_path}")
        # Cargar el archivo Excel, especificando que los encabezados están en la fila 8
        df = pd.read_excel(file_path, sheet_name='RptDetalleTransacciones', header=7)

        # Filtrar datos con Estado: Exitosa
        log_message("Filtrando datos con Estado: Exitosa")
        filtered_df = df[df['ESTADO'] == 'Exitosa']
        document_counts = filtered_df['DOCUMENTO'].value_counts()

        document_counts_df = document_counts.reset_index()
        document_counts_df.columns = ['DOCUMENTO', 'MES']  # Temporal column for replacing later

        # Obtener el mes anterior y el año actual
        now = datetime.now()
        last_month = (now.replace(day=1) - pd.DateOffset(months=1)).strftime('%B %Y')

        # Reemplazar la columna 'MES' con el mes anterior y año
        document_counts_df['MES'] = last_month

        # Cargar el archivo consolidado y la hoja "Base"
        log_message("Cargando archivo Excel consolidado")
        df2 = pd.read_excel('Consolidado_miid.xlsx', sheet_name='Base', header=0)

        # Asegurarse de que la columna 'DOCUMENTO' sea de tipo string
        df2['DOCUMENTO'] = df2['DOCUMENTO'].astype(str)
        document_counts_df['DOCUMENTO'] = document_counts_df['DOCUMENTO'].astype(str)

        # Filtrar documentos nuevos que no están en la base
        log_message("Identificando documentos nuevos")
        new_documents = document_counts_df[~document_counts_df['DOCUMENTO'].isin(df2['DOCUMENTO'])]
        
        log_message(f"Total Enrolados Facturables: {len(new_documents)}")

        # Concatenar los nuevos documentos al DataFrame consolidado existente
        df2 = pd.concat([df2, new_documents], ignore_index=True)

        # Guardar el DataFrame consolidado actualizado en el archivo Excel
        log_message("Guardando documentos en Consolidado_miid.xlsx")
        with pd.ExcelWriter('Consolidado_miid.xlsx', engine='openpyxl', mode='a', if_sheet_exists='replace') as writer:
            df2.to_excel(writer, sheet_name='Base', index=False)

        # Guardar la cantidad de documentos nuevos en la hoja del mes correspondiente
        log_message(f"Guardando conteo de documentos nuevos en la hoja {last_month}")
        with pd.ExcelWriter('Consolidado_miid.xlsx', engine='openpyxl', mode='a') as writer:
            workbook = writer.book
            if last_month not in workbook.sheetnames:
                workbook.create_sheet(last_month)
            worksheet = workbook[last_month]
            worksheet['B1'] = len(new_documents)

        # Segunda parte: manejo de STATUS DOCUMENTO_GRAL = 2
        log_message("Filtrando datos con Estado: Fallida")
        filtered_df = df[df['ESTADO'] == 'Fallida']

        # Obtener el conteo de documentos en la nueva filtración
        document_counts = filtered_df['DOCUMENTO'].value_counts()

        # Filtrar documentos nuevos que no están en la base
        new_documents = document_counts.index[~document_counts.index.isin(df2['DOCUMENTO'])]

        # Crear DataFrame con los nuevos documentos y sus conteos
        new_docs_df = pd.DataFrame({'DOCUMENTO': new_documents, 'Cantidad': document_counts[new_documents]})

        # Redondear los conteos
        new_docs_df['Cantidad'] = new_docs_df['Cantidad'].apply(lambda x: (x + 4) // 5)

        # Sumar los valores redondeados
        total_rounded_count = new_docs_df['Cantidad'].sum()

        log_message(f"Total No Enrolados Facturables: {total_rounded_count}")

        # Guardar el total redondeado en la hoja del mes correspondiente
        log_message(f"Guardando total redondeado en la hoja {last_month}")
        with pd.ExcelWriter('Consolidado_miid.xlsx', engine='openpyxl', mode='a') as writer:
            workbook = writer.book
            if last_month not in workbook.sheetnames:
                workbook.create_sheet(last_month)
            worksheet = workbook[last_month]
            worksheet['B2'] = total_rounded_count

        log_message("Proceso completado con éxito.")
        messagebox.showinfo("Éxito", "Proceso realizado con éxito.")
        os.startfile('Consolidado_miid.xlsx')

    except Exception as e:
        log_message(f"Error: {str(e)}")
        messagebox.showerror("Error", f"Ha ocurrido un error: {str(e)}")

def select_file():
    file_path = filedialog.askopenfilename(
        title="Seleccione el archivo Excel",
        filetypes=[("Archivos Excel", "*.xlsx *.xls")]
    )
    if file_path:
        run_process(file_path)

def run_process(file_path):
    threading.Thread(target=procesar_documentos_miid, args=(file_path,)).start()

# Configuración básica de la ventana de tkinter
root = tk.Tk()
root.title("Cargar archivo y Procesar")
root.geometry("600x400")

# Crear un botón para seleccionar el archivo
select_button = tk.Button(root, text="Cargar archivo Excel", command=select_file)
select_button.pack(pady=10)

# Crear y configurar un área de logs
logs_text = tk.Text(root, wrap=tk.WORD, height=15)
logs_text.pack(expand=True, fill=tk.BOTH, padx=10, pady=10)

# Iniciar el bucle principal de tkinter
root.mainloop()