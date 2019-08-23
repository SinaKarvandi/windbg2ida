from idautils import *
from idc import *
import os

#---------------------------------------------------------------------
# Global Variables
ScriptVersion = "1.0.0.0"

#---------------------------------------------------------------------
# Application Variables

# Configuration Registers (From w2i file)
Windbg2IDAVersion = ""
ImageName = ""
ModuleIndex = ""
ModuleBaseAddress = ""
ModuleEndAddress = ""
ModuleVersion = ""
InclueRegistersAsComment = False
ShowBranchTakenOrNot = False
# Holders
CurrentInstruction = ""
CurrentRegisters = ""
ListOfColoredFunctions = []
ListPointersWithColors = [] # For detecting colors that needs to be combined
#---------------------------------------------------------------------
def BlendColors(Color1 , Color2, amount):

    tempColor1 = (tuple(int(Color1[i:i+2], 16) for i in (0, 2, 4)))
    tempColor2 = (tuple(int(Color2[i:i+2], 16) for i in (0, 2, 4)))

    r = ((tempColor1[0] * amount) + tempColor2[0] * (1 - amount));
    g = ((tempColor1[1] * amount) + tempColor2[1] * (1 - amount));
    b = ((tempColor1[2] * amount) + tempColor2[2] * (1 - amount));
    
    return '%02x%02x%02x' % (r, g, b)
#---------------------------------------------------------------------

def CheckWhetherAddressIsValid(name_or_ea):
        """
        Function that accepts a name or an ea and checks if the address is enabled.
        If a name is passed then idaapi.get_name_ea() is applied to retrieve the name
        @return:
            - Returns the resolved EA or
            - Raises an exception if the address is not enabled
        """

        # a string? try to resolve it
        if type(name_or_ea) == types.StringType:
            ea = idaapi.get_name_ea(idaapi.BADADDR, name_or_ea)
        else:
            ea = name_or_ea

        # could not resolve name or invalid address?
        if ea == idaapi.BADADDR or not idaapi.isEnabled(ea):
            print("[*] Address (" + str(hex(name_or_ea)) + ") is invalid, Is it in current module ?!" )
        else :
            print("[*] Address ("+str(hex(name_or_ea))+") belongs to, Function : " + GetFunctionName(name_or_ea))
            ListOfColoredFunctions.append(GetFunctionName(name_or_ea))
        return ea
#---------------------------------------------------------------------
def InterpretFile(filePathArg):
	global ListPointersWithColors
	IsReadingInstructions = False # Detects whether we're in reading instructions state
	CurrentColor = 0x0c0387 # Default Color

	with open(filePathArg) as fp:
		line = fp.readline()
		while line:
			if IsReadingInstructions == False :
				if "Windbg2IDA Version=" in line:
					Windbg2IDAVersion = line.strip().replace("Windbg2IDA Version=","")
					print("[*] Current File Windbg 2 IDA Version : " + Windbg2IDAVersion)
	
				elif "Image Name=" in line:
					ImageName = line.strip().replace("Image Name=","")
					print("[*] Image Name : " + ImageName)
	
				elif "Module Index=" in line:
					ModuleIndex = line.strip().replace("Module Index=","")
					print("[*] Module Index : " + ModuleIndex)
	
				elif "Module Base Address=" in line:
					ModuleBaseAddress = int(line.strip().replace("Module Base Address=","") ,16)
					print("[*] Module Base Address : " + str(hex(ModuleBaseAddress)))
	
				elif "Module End Address=" in line:
					ModuleEndAddress = int(line.strip().replace("Module End Address=","") ,16)
					print("[*] Module End Address : " + str(hex(ModuleEndAddress)))
	
				elif "Module Version=" in line:
					ModuleVersion = line.strip().replace("Module Version=","")
					print("[*] Module Version : " + ModuleVersion)
	
				elif "InclueRegistersAsComment=" in line:
					if line.strip().replace("InclueRegistersAsComment=","") == "true" :
						InclueRegistersAsComment = True
					else:
						InclueRegistersAsComment = False
	
				elif "ShowBranchTakenOrNot=" in line:
					if line.strip().replace("ShowBranchTakenOrNot=","") == "true" :
						ShowBranchTakenOrNot = True
					else:
						ShowBranchTakenOrNot = False

				elif "Color=" in line:
					CurrentColor = int(line.strip().replace("Color=","") ,16)
					print("[*] Color : " + str(hex(CurrentColor)))
		
				
				elif "Instructions=" in line:
					IsReadingInstructions = True
					print("[*] Start Reading Instructions ...")
	
	
			else :
				# Reading Lines of Instruction and Registers
	
				# Detect end of file
				if "<EOF>" in line :
					line = fp.readline()
					continue
	
				if InclueRegistersAsComment:
					CurrentRegisters = line.replace("\n","")
					CurrentInstruction = fp.readline()
				else :
					CurrentInstruction = line
	
				if ShowBranchTakenOrNot :
					# Check if Branch is taken or not
					if "[br=0]" in CurrentInstruction :
						CurrentRegisters = "[Branch is not taken] "+ CurrentRegisters
					if "[br=1]" in CurrentInstruction :
						CurrentRegisters = "[Branch is taken] "+ CurrentRegisters
	
				# Interpret Instructions and Registers
				CurrentPointer = CurrentInstruction.split(" ")[0].replace("`","")
				CurrentIndexFromModuleBase = int(CurrentPointer , 16) - ModuleBaseAddress
	
				# Computer where to set color 
				ColorPointer = idaapi.get_imagebase() + CurrentIndexFromModuleBase 
	
				print("[*] Setting color to : " + str(hex(ColorPointer)))
				#============================================================================

				# Detecting color combinations
				ListPointersWithColors.append(tuple([ColorPointer,str(hex(CurrentColor))]))
				#============================================================================

				# Check Whether Address Is Valid
				CheckWhetherAddressIsValid(ColorPointer)

				SetColor(ColorPointer, CIC_ITEM, CurrentColor)
				if InclueRegistersAsComment:
					if "[gotonewline]" in CurrentRegisters :
						MakeRptCmt(ColorPointer, CurrentRegisters.split("[gotonewline]")[0] + "\n" + CurrentRegisters.split("[gotonewline]")[1])
					else :
						MakeRptCmt(ColorPointer, CurrentRegisters)
	
	
			line = fp.readline()

#---------------------------------------------------------------------

print("[*] IDAScript interpreter for Windbg2IDA files.")
print("[*] Script Version :" + ScriptVersion)
print("[*] Written by Sina Karvandi")

print("===================================================")

# Interpret File
FolderOfw2iFiles = os.path.dirname(os.path.realpath(__file__)) + "\\w2i Files"
IsFileFound = False

for file in os.listdir(FolderOfw2iFiles):
	#if file.endswith(".w2i"):
		filePath = os.path.join(FolderOfw2iFiles, file)
		print("[*] Interpreting file :" + filePath)
		InterpretFile(filePath)
		IsFileFound = True

if IsFileFound == False:
	print("[*] No file found !")
	print("[*] Please make sure you copy .w2i files into the : " + FolderOfw2iFiles)

# Show list of functions that colors applied to	
print("===================================================")

print("Changes applied to these function(s) : ")

# Unique them
ListOfColoredFunctions = list(set(ListOfColoredFunctions)) 

for item in ListOfColoredFunctions:
	print("\t" + item)

print("===================================================")
print("Happy Reverse Engineering ;)")
print("===================================================")
